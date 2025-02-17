import UI from '../shared/types/ui'
import Request from '../shared/types/request'
import CustomProcedure from '../shared/types/custom-procedure'
import Browser from '../shared/types/browser'
import Utils from '../shared/utils'

export default class ExtractTabsByDomain implements CustomProcedure {
  private static INPUT_DOMAIN_ID: string = 'input-domain'

  constructor(private readonly browserService: Browser.Service) {}

  getDescription(): string {
    return 'Extract Tabs By Domain'
  }

  getName(): string {
    return 'tabs.extractByDomain'
  }

  async handle(request: Request<UI.Page>): Promise<UI.Page> {
    const page = request.data!
    const pressedKeys = request.data?.metadata?.pressedKeys || []

    const inputDomainValue = Utils.getInput(ExtractTabsByDomain.INPUT_DOMAIN_ID, page)?.value || ''
    const tabs = await this.browserService.getTabsFromCurrentWindow()
    const uniqueDomains = new Set(tabs.map(({ url }) => Utils.getDomainFromURL(url)))

    if (pressedKeys.includes('Enter')) {
      await this.extractTabsByDomain(inputDomainValue)
      return page
    }

    return {
      sections: [
        {
          elements: [
            {
              input: {
                id: ExtractTabsByDomain.INPUT_DOMAIN_ID,
                placeholder: 'Enter domain',
                value: inputDomainValue
              }
            }
          ]
        },
        {
          elements: Array.from(uniqueDomains)
            .sort((a, b) => a.localeCompare(b))
            .filter((domain) => inputDomainValue.length === 0 || domain.startsWith(inputDomainValue))
            .map((domain) => ({
              text: {
                text: domain
              }
            }))
        }
      ]
    }
  }

  private async extractTabsByDomain(domainPrefix: string) {
    if (domainPrefix.length > 0) {
      const tabs = await this.browserService.getTabsFromCurrentWindow()
      const tabsToExtract = tabs.filter(({ url }) => Utils.getDomainFromURL(url).startsWith(domainPrefix))
      await this.browserService.createWindow(tabsToExtract.map(({ id }) => id))
    }
  }
}
