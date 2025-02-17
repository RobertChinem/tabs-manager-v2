import Request from './request'
import UI from './ui'
import Procedure from './procedure'

export default interface CustomProcedure extends Procedure {
  handle(request: Request<UI.Page>): Promise<UI.Page>
  getDescription(): string
}
