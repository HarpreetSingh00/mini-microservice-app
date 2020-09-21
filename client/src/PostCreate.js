import React from 'react'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const schema = yup.object({
    postTitle: yup.string().required(),
});

export default () => {

    const handleSubmit = async (values) => {
        const formData = JSON.stringify(values, null, 2)

        try {

            await axios.post('http://127.0.0.1:4000/posts',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })


        } catch (e) {
            console.log('error occured while creating post', e)
        }

    }

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{ postTitle: '' }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId="postTitle">
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="postTitle"
                                    value={values.postTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your post title"
                                    isInvalid={!!errors.postTitle}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.postTitle}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
            </Formik>
        </div>
    )
}