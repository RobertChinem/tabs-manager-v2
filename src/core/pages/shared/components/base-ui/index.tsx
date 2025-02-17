import React from 'react'
import UI from '../../../../../shared/types/ui'
import PlatformInput from '../input'

namespace BaseUI {
  export function Text({ text, className }: UI.Text): React.JSX.Element {
    return <p className={className}>{text}</p>
  }

  export function Input({
    onInputChange,
    inputParams: { id, placeholder, className, value }
  }: {
    onInputChange: (eventTarget: HTMLInputElement) => void
    inputParams: UI.Input
  }): React.JSX.Element {
    return (
      <PlatformInput
        onChange={(e) => onInputChange(e.target)}
        id={id}
        placeholder={placeholder}
        className={className}
        value={value}
      />
    )
  }

  export function Element({
    onInputChange,
    elementParams: { input, text }
  }: {
    onInputChange: (eventTarget: HTMLInputElement) => void
    elementParams: UI.Element
  }): React.JSX.Element {
    return (
      <>
        {!!input && <Input onInputChange={onInputChange} inputParams={input} />}
        {!!text && <Text {...text} />}
      </>
    )
  }

  export function Section({
    onInputChange,
    sectionParams: { elements }
  }: {
    onInputChange: (eventTarget: HTMLInputElement) => void
    sectionParams: UI.Section
  }): React.JSX.Element {
    return (
      <div className='flex flex-col gap-2'>
        {elements.map((elementParams) => (
          <Element onInputChange={onInputChange} elementParams={elementParams} />
        ))}
      </div>
    )
  }

  export function Page({
    onInputChange,
    pageParams: { sections }
  }: {
    onInputChange: (eventTarget: HTMLInputElement) => void
    pageParams: UI.Page
  }): React.JSX.Element {
    return (
      <div className='flex flex-col gap-4'>
        {sections.map((sectionParams) => (
          <Section onInputChange={onInputChange} sectionParams={sectionParams} />
        ))}
      </div>
    )
  }
}

export default BaseUI
