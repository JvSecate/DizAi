import React, { Fragment, useState } from 'react'
import "./sistema_empresa.css"
import ImgWomen from '../../assets/img/image 1.png'

const Sistema_Empresa = () => {
  return (
    <Fragment>
        <div className='Avaliacao_Pagina_Empresa'>
          <div className='Tabela_Avaliacao_Empresa'>
            <h1 className='Text_1'>Deseja Responder a Avaliação?</h1>
            <h2 className='Text_2'><b>Comente Aqui</b></h2>
              <div className='Tabela_Dados_Empresa'>
                <div className='Dados_Avaliacao_Empresa'>
                    <label htmlFor="avaliacao">
                        Usuario/Avaliação
                    </label>
                    <input 
                        required 
                        type="avaliacao"
                        id="avaliacao"
                        name="avaliacao"
                        />
                </div>
                <div className='Dados_Avaliacao_Empresa'>
                    <label htmlFor="descricao">
                        Descrição
                    </label>
                    <textarea
                      required
                      id="descricao"
                      name="descricao"
                      rows="6"
                      cols="50"
                    />
                </div>
              </div>
          <div className='Container_Button_Empresa'>
            <button className='Enviar_Usuario' type="submit">
                Enviar
            </button>
          </div>
          </div>
          <div className='Banner_imgWomen'>
            <img src={ImgWomen} className='Imagen_Women'/>
          </div>
        </div>
    </Fragment>
  )
}

export default Sistema_Empresa