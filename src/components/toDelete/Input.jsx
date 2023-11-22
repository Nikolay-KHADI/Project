

export const Input= ({field, ...props})=> {
  return (
    <div>
      <label htmlFor={field.name} >{props.label}</label>
      <input  {...field} {...props} id={field.name}/>
    </div>
  )
}
