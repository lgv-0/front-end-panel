import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from "styled-components";
import { APIGetLogs } from './API';

function LogsTab(props)
{
    let [title, sTitle] = useState("Logs");
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
                        Location = "G";
                        break;
                    case "PANEL":
                        Location = "P";
                        break;
                    case "CLIENT":
                        Location = "C";
                        break;
                    default:
                        break;
                }

                tlogs += 
                    `[${Location}][${response[i].timestamp}][${response[i].level.toUpperCase()}] ${response[i].message}\n`;
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
        width: 80%;
        height: 60vh;
        background-color: black;
        color: white;
    }
`;

export default LogsTab;