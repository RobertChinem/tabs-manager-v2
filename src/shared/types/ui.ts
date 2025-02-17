namespace UI {
  export type Input = {
    id: string
    placeholder?: string
    value?: string
    className?: string
  }

  export type Text = {
    text: string
    className?: string
  }

  export type Element = {
    input?: Input
    text?: Text
  }

  export type Section = {
    elements: Element[]
  }

  export type Page = {
    sections: Section[]
    metadata?: {
      pressedKeys?: string[]
    }
  }
}

export default UI
