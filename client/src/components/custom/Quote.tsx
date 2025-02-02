// export function QuoteComponent() {
//   return (
//     <div className='hidden lg:flex items-center justify-center bg-muted p-6 xl:p-10'>
//       <div className='mx-auto max-w-[500px] space-y-4'>
//         <blockquote className='text-lg font-semibold leading-snug'>
//           &ldquo;The customer service I received was exceptional. The support
//           team went above and beyond to address my concerns.&rdquo;
//         </blockquote>
//         <div className='font-semibold'>Mane don</div>
//         <div className='text-sm text-muted-foreground'>CEO, Paalo</div>
//       </div>
//     </div>
//   );
// }

export function QuoteComponent() {
  return (
    <div 
      className="hidden lg:flex items-center justify-center p-6 xl:p-10 min-h-screen bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
    >
      <div className="mx-auto max-w-[500px] space-y-4 text-center bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        <blockquote className="text-lg font-semibold leading-snug">
          &ldquo;The customer service I received was exceptional. The support
          team went above and beyond to address my concerns.&rdquo;
        </blockquote>
        <div className="font-semibold">Mane don</div>
        <div className="text-sm text-muted-foreground">CEO, Paalo</div>
      </div>
    </div>
  );
}

