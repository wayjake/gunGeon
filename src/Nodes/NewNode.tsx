import { Helmet } from 'react-helmet'
import { DungeonNode } from '.'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getRandomUsername, IdTypes, makeId } from '../utils'
import gun, { namespace } from '../gun'
import { useNavigate } from 'react-router-dom'
import { NewSubNodeProps } from './NewSubNode.styled'
import { getRandomFromArray } from '../utils'
import {
    Wrapper,
    FormItem,
    Label,
    Textarea,
    Input,
    Button,
} from './NewNode.styled'

const NewNode = (props: NewSubNodeProps) => {
    const [loading, setLoading] = useState(false)
    const nodeRef = gun.get(
        namespace + 'node'
    ) /*is node (noun) plural? ;) #trickledown42*/
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        if (props.head) {
            setValue('head', props.head)
        }
    }, [props.head])

    useEffect(() => {
        setValue('key', makeId(7, [IdTypes.lower, IdTypes.numbers]))
        setValue('user', getRandomUsername())
    }, [])

    const createNode = (data: DungeonNode | any) => {
        if (!data) {
            return
        }
        setLoading(true)
        const key = data.key
        delete data.key

        /* this is business logic that I'd like to make dissappear */

        if (data.head) {
            const messagePreview =
                data.message.length > 42
                    ? `${data.message.substring(0, 39)}...`
                    : data.message
            nodeRef
                .get(data.head)
                .get('directions')
                .get(key)
                .put(messagePreview, (ack) => {
                    console.log(`added message preview`)
                })
        }
        const newNode = { ...data, date: Date.now() }
        nodeRef.get(key).put(newNode, (ack) => {
            setLoading(false) // unecessary clean up lol
            console.log(`done adding new node`)
            console.log(ack)
        })
        if (!data.head) navigate(`/node/${key}`)
        props.nodeAdded(newNode)
    }

    const handleUserKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(createNode)()
            e.preventDefault()
        }
    }

    return (
        <Wrapper>
            <Helmet>
                <title>New Node</title>
            </Helmet>

            <FormItem className={errors['message'] ? 'error' : ''}>
                <Label>
                    Message:
                    <Textarea
                        autoFocus
                        onKeyPress={handleUserKeyPress}
                        {...register('message', { required: true })}
                    />
                </Label>
            </FormItem>

            <FormItem className={errors['key'] ? 'error' : ''}>
                <Label>
                    {getRandomFromArray([
                        'Node Id',
                        'Node Ref',
                        'Gun Id',
                        'Id',
                        'Key',
                    ])}
                    :
                    <Input {...register('key', { required: true })} />
                </Label>
            </FormItem>

            <FormItem className={errors['user'] ? 'error' : ''}>
                <Label>
                    User:
                    <Input {...register('user', { required: true })} />
                </Label>
            </FormItem>

            {props?.head && (
                <FormItem>
                    <Label>
                        {getRandomFromArray([
                            'Head',
                            'Top',
                            'Parent',
                            'Up',
                            'Previous',
                        ])}
                        :
                        <Input {...register('head')} />
                    </Label>
                </FormItem>
            )}

            <FormItem>
                <Button
                    disabled={loading || errors.length}
                    onClick={handleSubmit(createNode)}
                >
                    {getRandomFromArray(['Send', 'Create', 'Push', 'Generate'])}
                </Button>
            </FormItem>
        </Wrapper>
    )
}

export default NewNode
