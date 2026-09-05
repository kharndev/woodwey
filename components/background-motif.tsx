type MotifVariant = 'monogram' | 'joinery' | 'metal'

export function BackgroundMotif({variant='monogram',className=''}:{variant?:MotifVariant;className?:string}){
  if(variant==='joinery')return <svg className={`background-motif ${className}`} viewBox="0 0 360 260" aria-hidden="true"><path d="M42 214V74h118v58h158v82M42 132h118M99 74v140M160 132v82M219 132v82M278 132v82"/><path d="M30 226h300M30 62h142v58h158"/><circle cx="99" cy="132" r="8"/><circle cx="219" cy="173" r="7"/></svg>
  if(variant==='metal')return <svg className={`background-motif ${className}`} viewBox="0 0 360 260" aria-hidden="true"><path d="M34 222h292V42H34zM58 222V66h244v156M82 66v156M106 66v156M130 66v156M154 66v156M178 66v156M202 66v156M226 66v156M250 66v156M274 66v156"/><path d="M34 96h292M34 196h292"/></svg>
  return <svg className={`background-motif ${className}`} viewBox="0 0 360 260" aria-hidden="true"><path d="M30 56l42 154L120 88l48 122 48-122 48 122 66-154"/><path d="M38 226h284M58 38h244"/><circle cx="180" cy="130" r="94"/><circle cx="180" cy="130" r="72"/></svg>
}
