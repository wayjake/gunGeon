import { DungeonNode } from 'Nodes'
import { useEffect, useState } from 'react'
import gun, { namespace } from './gun'

const useListen = (
   query: string | undefined | null,
   model: string = 'node',
   single: boolean = false
): DungeonNode | DungeonNode[] => {
   const [nodes, setNodes] = useState<DungeonNode[]>([])

   const setNodesCallback = (newNode: any = {}, key) => {
      if (single && query !== key) {
         console.log(`query not in sync with result`, query, key)
      }

      setNodes((nodes) => {
         const filteredNodes = nodes.filter((node) => node.key !== key)
         if (!newNode) {
            return filteredNodes
         }
         return [...filteredNodes, { ...newNode, key }]
      })
   }

   useEffect(() => {
      setNodes([])
      if (!query) {
         return () => {}
      }
      const chain = gun
         .get(`${namespace}/${model}`)
         .get(query)
         .on(setNodesCallback)
      return () => chain.off()
   }, [query])

   if (single) return nodes[0]
   return nodes
}

export default useListen
