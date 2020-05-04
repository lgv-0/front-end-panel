import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { APIGetLogs } from './API';

function DateFromUTCString(utc)
{
    let temp = new Date(utc);
    return `${temp.toLocaleDateString()} ${('00'+temp.getHours()).slice(-2)}:${('00'+temp.getMinutes()).slice(-2)}:${('00'+temp.getSeconds()).slice(-2)}`;
}

function LogsTab(props)
{
    let [title] = useState("Logs");
    let [logs, sLogs] = useState("");

    useEffect(()=>{
        APIGetLogs({"atk":props.cookies.get("msid")}, (response)=>
        {
            let tlogs = "";
            for (let i = 0; i < response.length; i++)
            {
                let Location = "U";
                
                switch (response[i].label)
                {
                    case "GLOBAL":
                        Location = "GLOBAL";
                        break;
                    case "PANEL":
                        Location = "PANEL";
                        break;
                    case "CLIENT":
                        Location = "CLIENT";
                        break;
                    case "CHEAT":
                        Location = "CHEAT";
                        break;
                    default:
                        break;
                }

                tlogs += 
                    `[${Location}][${DateFromUTCString(response[i].timestamp)}][${response[i].level.toUpperCase()}] ${response[i].message}\n`;
            }
            sLogs(tlogs);
        })
    }, []);

    return (
        <Tab>
            <h1>{title}</h1>
            <textarea value={logs} rows={logs.length} columns={1}/>
        </Tab>
    );
}

let Tab = styled.div`
    padding: 30px;
    text-align: left;

    textarea
    {
        width: 100%;
        height: 60vh;
        background-color: black;
        color: white;
    }
`;

export default LogsTab;