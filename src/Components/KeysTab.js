import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import styled from "styled-components";
import { APIDeleteKey, APIGetKeys, APIPostKey, APIGetCheats } from "./API";

function KeyTab(props)
{
    const [KeyData, sKeyData] = useState([]);

    useEffect(() =>
    {
        if (props.cookies.get("msid") != null && KeyData.length === 0)
            APIGetKeys({"atk":props.cookies.get("msid")},
            (data)=>
            {
                sKeyData(data);
            },
            (error)=>
            {
                console.log("error");
            })
    }, [props, KeyData.length]);

    return (
        <Tab>
            <h1>Key Control</h1>
            <Table dark>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Key</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        KeyData.map((i)=>
                        {
                            return (
                                <tr key={i.key}>
                                    <th scope="row">{i.id}</th>
                                    <th>{i.key}</th>
                                    <th>
                                    {i.id !== 1 ? <Button color="warning" onClick={(e)=>HandleDeleteRequest(e, i, props.cookies, sKeyData)}>Delete</Button> : 
                                        <Button onClick={()=>{sKeyData([])}}>Refresh</Button>}
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <hr />
            <KeyForm cookies={props.cookies} setKeyData={sKeyData} />
        </Tab>
    );
}

let Tab = styled.div`
    padding: 30px;
    text-align: left;

    .keyCreate
    {
        margin-top: 80px;
        width: 500px;

        input
        {
            color: white;
        }
    }
`;

function makeid(length)
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ )
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

function KeyForm(props)
{
    let [textInput, sTextInput] = useState("");

    let [cheatArray, sCheatArray] = useState([]);

    let [selectCheatArray, sSelectCheatArray] = useState([]);

    function SwapCheat(id)
    {
        let index = selectCheatArray.find((curid)=>{return curid === id});
        if (index === undefined)
            sSelectCheatArray([ ...selectCheatArray, id ]);
        else
        {
            sSelectCheatArray(
                selectCheatArray.filter((i)=>
                {
                    return id !== i;
                })
            );
        }
    }

    useEffect(() =>
    {
        if (cheatArray.length === 0)
        {
            APIGetCheats({"atk":props.cookies.get("msid")},
            (data)=>
            {
                sCheatArray(data);
            },
            (error)=>
            {
                console.log("error");
            })
        }
    }, [cheatArray.length]);

    return (
        <Container className="keyCreate">
            <h3>Create Key</h3>
            <InputGroup>
                <Input onChange={(e)=>{sTextInput(e.target.value.replace(" ", ""))}} placeholder="Key" value={textInput} className="bg-dark" />
                <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={(e)=>{sTextInput(makeid(20))}}>Generate Random</Button>
                </InputGroupAddon>
            </InputGroup>
            { cheatArray.map((e)=>{ console.log(selectCheatArray)
            return (
                <InputGroup>
                    <Input
                        type="checkbox"
                        key={e.id}
                        name={e.name}
                        title={e.name}
                        onChange={ (event)=>{ SwapCheat(e.id) } }/>
                    <Label for={e.name}>{e.name}</Label>
                </InputGroup>
                )
                }) }
            <br />
            <InputGroup>
                <Button color="info" block onClick={(e)=>{
                    if (textInput.length > 7)
                    {
                        HandleCreateRequest(e, props.cookies, textInput, selectCheatArray, props.setKeyData);
                        sTextInput("Key");
                    }}}>Create</Button>
            </InputGroup>
            <br />
        </Container>
    );
}

function HandleCreateRequest(e, cookies, key, cheatids, fKeyData)
{
    APIPostKey({"atk":cookies.get("msid"), "key": key, "cheats": cheatids },
        (data)=>
        {
            fKeyData([]);
        },
        ()=>
        {
            console.log("error");
        });
}

function HandleDeleteRequest(e, i, cookies, refresh)
{
    APIDeleteKey({"atk":cookies.get("msid"), "key":i["id"]},
        (data)=>
        {
            refresh([]);
        },
        ()=>
        {
            console.log("error");
        });
}

export default KeyTab;