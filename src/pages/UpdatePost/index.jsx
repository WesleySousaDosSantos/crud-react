import { useParams } from "react-router-dom";
import { Form } from "../../components/Form";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function UpdatePost() {
    const { id } = useParams()
    const navigate = useNavigate()

    function handleUpdatePost(data) {
        api.put(`/posts/${id}`, data)
        navigate('/')
    }

    return (
        <div>
            <Form title={'Editar publicação'} textbutton={'Salvar'} onAction={handleUpdatePost} />
        </div>
    )
}