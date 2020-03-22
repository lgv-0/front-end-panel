import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { APIGetCheats } from "./API";

function CheatTable(props)
{
    const [CheatData, sCheatData] = useState([]);

    useEffect(() =>
    {
        props.title("Cheat Information");
        if (props.cookies.get("msid") != null && CheatData.length === 0)
            APIGetCheats({"atk":props.cookies.get("msid")},
            (data)=>
            {
                sCheatData(data);
            },
            (error)=>
            {
                console.log("error");
            })
    }, [CheatData.length, props]);

    return (
            <Table dark>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Target</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        CheatData.map((i)=>
                        {
                            return (
                                <tr key={i.id}>
                                    <th scope="row">{i.id}</th>
                                    <th>{i.name}</th>
                                    <th>{i.version}</th>
                                    <th>{i.target}</th>
                                    <th><Link to={`/panel/info/${i.id}`}>Modify {i.name}</Link></th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
    );
}

export default CheatTable;