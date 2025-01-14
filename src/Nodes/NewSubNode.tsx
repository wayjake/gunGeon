import { useEffect, useState } from 'react'
import { NewNode } from '.'
import useKeyboard from '../utils/useKeyboard'
import { Wrapper, FormItem, CancelButton } from './NewSubNode.styled'
import { NewSubNodeProps } from './NewNode'
import { Button } from 'Interface'

const NewSubNode = ({ head, dashboardFeature }: NewSubNodeProps) => {
   const [pressed, setPressed] = useState(false)
   const keypressed = useKeyboard(['n', 'c'])

   useEffect(() => {
      if (keypressed === 'n') {
         setPressed(true)
      }
      if (keypressed === 'c') {
         setPressed(false)
      }
   }, [keypressed])

   const nodeAdded = (data: any) => {
      setPressed(false)
   }

   return (
      <Wrapper>
         {!pressed && (
            <FormItem>
               <Button onClick={() => setPressed(true)}>Comment</Button>
            </FormItem>
         )}

         {pressed && (
            <>
               <CancelButton onClick={() => setPressed(false)}>X</CancelButton>
               <FormItem>
                  <NewNode
                     head={head}
                     nodeAdded={nodeAdded}
                     dashboardFeature={dashboardFeature}
                  />
               </FormItem>
            </>
         )}
      </Wrapper>
   )
}

export default NewSubNode
