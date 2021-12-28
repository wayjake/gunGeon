import { Helmet } from 'react-helmet'
import gun, { namespace } from '../gun'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { DungeonNode, NewSubNode } from '.'
import { SimpleIcon, Styles } from '../Interface'
import {
    BackSectionWrapper,
    BackButton,
    NewNodeWrapper,
    NewNode,
    NodeLink,
    LinkWrapper,
    Message,
    MessageDate,
    MessageTop,
    MessageWrapper,
    Username,
} from './ViewNode.styled'

const ViewNode = () => {
    const [node, setNode] = useState<DungeonNode | undefined>()
    const [directions, setDirections] = useState<any>({})
    const { key = '' } = useParams()
    const navigate = useNavigate()

    /**
     *    for when i make a new hook
     *    or when i write a new book
     *    REACT, THE PARTS THAT MATTER
     */
    useEffect(() => {
        setNode(undefined)
        gun.get(namespace + 'node')
            .get(key)
            .once((node: DungeonNode | any = {}) => {
                console.log(node)
                setNode(node)
            })
    }, [key])

    /**
     *    WHY ARE THE DIRECTIONS HERE NOT
     *    LIVING DIRECTLY ON THE NODE ITSELF?
     *    well sir, that is because ________.
     */
    useEffect(() => {
        setDirections({})
        gun.get(namespace + 'node')
            .get(key)
            .get('directions')
            .map()
            .once((message: any, key: any) => {
                setDirections((prev: any) => {
                    return { ...prev, ...{ [key]: message } }
                })
            })
    }, [key])

    const nodeAdded = () => {
        console.log(`i'm in view node`)
    }

    const goback = () => {
        navigate(`/node/${node?.head}`)
    }

    const dateFormatted = useMemo(() => {
        if (!node?.date) return ''
        const date = new Date(node?.date)

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }, [node?.date])

    return (
        <>
            <Helmet>
                <title>View Node '{key.substring(0, 50)}'</title>
            </Helmet>

            <BackSectionWrapper className="blockSection">
                {node?.head && <BackButton onClick={goback}>{'< '}</BackButton>}
                {!node?.head && <div>&nbsp;</div>}
                <NewNode to="/nodes/new">New Parent</NewNode>
            </BackSectionWrapper>

            <MessageWrapper>
                <MessageTop>
                    {node?.user && <Username>@{node?.user}</Username>}
                    <MessageDate>{dateFormatted}</MessageDate>
                </MessageTop>
                <Message>{node?.message}</Message>
            </MessageWrapper>

            {Object.keys(directions).map((key: string) => {
                return (
                    <LinkWrapper className="linkWrapper">
                        <NodeLink
                            to={`/node/${key}`}
                            key={key}
                            className="nodeLink"
                        >
                            {directions[key]}
                        </NodeLink>
                        <SimpleIcon
                            content="[ d ]"
                            hoverContent="[ prune ]"
                            style={Styles.warning}
                            className="simpleIcon"
                        />
                    </LinkWrapper>
                )
            })}

            <NewNodeWrapper>
                <NewSubNode head={key} nodeAdded={nodeAdded} />
            </NewNodeWrapper>
        </>
    )
}

export default ViewNode
