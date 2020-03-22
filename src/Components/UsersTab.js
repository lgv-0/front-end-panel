import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Table, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { APIGet, APIGetUsers } from "./API";

function UserTab(props)
{
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayNumb, sDisplayNumb] = useState(0);
    const [UserData, sUserData] = useState([]);

    useEffect(() =>
    {
        if (props.cookies.get("msid") != null && UserData.length === 0)
            APIGetUsers({"atk":props.cookies.get("msid")},
                (data)=>
                {
                    sUserData(data);
                    sDisplayNumb(document.getElementsByClassName("table-dark")[0].getElementsByTagName("tr").length - 1);
                },
                (error)=>
                {
                    console.log(error);
                })
    }, [UserData.length]);

    let ChangePageUpdate = function(inc) {setCurrentPage(parseInt(inc.target.innerText) - 1);}

    return (
        <Tab>
            <h1>User Control</h1>
            <div id="DisplayCount">
                <ButtonDropdown isOpen={dropdownOpen} toggle={()=>{setDropdownOpen(!dropdownOpen)}}>
                    <DropdownToggle caret>
                        Page {currentPage + 1}
                    </DropdownToggle>
                    <DropdownMenu>
                        {MakePageOptions(Math.ceil(UserData.length / 8), ChangePageUpdate).map((i) => {return i;})}
                    </DropdownMenu>
                </ButtonDropdown>
                &nbsp;
                <Button onClick={()=>{sUserData([])}}>Refresh</Button>
                <p>Displaying {displayNumb} of {UserData.length} users</p>
            </div>
            <Table dark>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reg. Date</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>IP Address</th>
                        <th>HWID</th>
                    </tr>
                </thead>
                <tbody>
                    {UserData.map((i, index)=>
                        {
                            if (index > ((currentPage) * 8) - 1 &&
                                index < ((currentPage) * 8) - 1 + 9)
                                    return (makeTableRow(i, props.cookies, sUserData))
                            else
                                return null;
                        })}
                </tbody>
            </Table>
        </Tab>
    );
}

let Tab = styled.div`
    padding: 30px;
    text-align: left;

    #DisplayCount p
    {
        float:right;
        user-select: none;
    }
`;

let MakePageOptions = (cnt, updfnc) =>
{
    let tmp = [];
    for (let i = 0; i < cnt; i++)
        tmp.push(<DropdownItem onClick={updfnc} key={i}>{i + 1}</DropdownItem>);
    return tmp;
}

function HandleSuspendResume (e, i, cookies, refresh, status)
{
    APIGet({"req":"setstat", "atk":cookies.get("msid"), "name":i["name"], "status":status},
        (data)=>
        {
            if (data === "x_Success")
                refresh([]);
        },
        ()=>
        {
            console.log("error");
        });
}

function GetSuspend(i, props, refresh)
{
    let toReturn = i.status == 2 ? <Button color="warning" onClick={(e)=>HandleSuspendResume(e, i, props, refresh, 1)}>Denied</Button>
        : <Button color="success" onClick={(e)=>HandleSuspendResume(e, i, props, refresh, 2)}>Allowed</Button>;
    return (toReturn);
}

function makeTableRow(i, cookies, refresh)
{
    return (
        <tr key={i.name}>
            <th scope="row">{i.name}</th>
            <td>{i.regdate.trim(0, 50)}</td>
            <td>{i.status == 0 ? "Admin" : GetSuspend(i, cookies, refresh)}</td>
            <td>{i.lastlogin}</td>
            <td>{i.ip}</td>
            <td>{i.hwid}</td>
        </tr>);
}

export default UserTab;
