import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const postSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  content: yup.string().required()
});


export function Form({ title, textbutton, onAction }) {
  const navigation = useNavigate();

  const { id } = useParams()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema)
  });

  async function getDataUpdate() {
    const response = await api.get(`/posts/${id}`)
    reset(response.data)
  }

  useEffect(() => {
    getDataUpdate();

  }, [])

  return (
    <form onSubmit={handleSubmit(onAction)}>
      <h2>{title}</h2>
      <div className="field">
        <input placeholder="Título" {...register("title")} />
        {errors.title && errors.title.type === "required" && (
          <span className="alert" role="alert">O campo titulo não pode ser vazio</span>
        )}
      </div>

      <div className="field">
        <input placeholder="Descrição" {...register("description")} />
        {errors.description && errors.description.type === 'required' && (
          <span className="alert" role="alert">O campo Descrição não pode ser vazio</span>
        )}
      </div>

      <div className="textarea">
        <textarea placeholder="Conteudo" {...register("content")} />
        {errors.content && errors.content.type === 'required' && (
          <span className="alert" role="alert">O campo Descrição não pode ser vazio</span>
        )}
      </div>

      <div className="container-button">
        <button className="button-save" type="submit">{textbutton}</button>
        <button onClick={() => navigation('/')} className="button-end">Voltar</button>
      </div>
    </form>
  );
}
