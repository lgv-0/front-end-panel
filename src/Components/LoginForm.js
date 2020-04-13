import React, { useState } from 'react';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Input, Form, Label, Button, Alert } from 'reactstrap';
import { APIAuth } from "./API";

const loginSchema = Yup.object().shape(
    {
        username: Yup.string()
            .min(6, 'Too Short!')
            .max(24, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .max(24, 'Too Long!')
            .required('Required')
    });

export const LoginForm = (props) => 
    {
        let [aText, sAtext] = useState("");

        let cb = (values, cookies, fText, fName) =>
        {
            let us = values.username, pw = values.password;

            APIAuth({"username":us, "password":pw},
            (data)=>
                {
                    cookies.set("msid", data.token);
                    cookies.set("name", values.username);
                    fName(values.username);
                },
                ()=>
                {
                    //Connection error
                    fText("Looks like we're having trouble connecting you.");
                });
        }

        return (
            <Formik initialValues={{username: '', password: ''}} validationSchema={loginSchema} onSubmit={(e)=>{cb(e, props.cookies, sAtext, props.fName);}}>
                {({ errors, touched }) =>
                (
                    <Form tag={FormikForm}>
                        <FormGroup>
                            {aText ? <Alert color="danger">{aText}</Alert> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Input tag={Field} type="name" name="username" id="username" placeholder="Username" bsSize="m" className="bg-dark text-white" />
                                {errors.username && touched.username ? (<div>{errors.username}</div>) : ""}
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Input tag={Field} type="password" name="password" id="password" placeholder="Password" bsSize="m" className="bg-dark text-white" />
                                {errors.password && touched.password ? (<div>{errors.password}</div>) : ""}
                            </Label>
                        </FormGroup>
                        <Button color="secondary" size="m" block type="submit">Login</Button>
                    </Form>
                )}
            </Formik>
        );
    };