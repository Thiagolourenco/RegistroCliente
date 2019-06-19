import React, {Component} from 'react'
import './style.css'
import 'font-awesome/css/font-awesome.min.css'
import Header from '../Header'
import api from '../../Services/api'

class Conteudo extends Component {
    constructor(props){
        super(props)
        this.state = {
            register: [],
        }

        this.handleRemove = this.handleRemove.bind(this)
    }

    async componentDidMount(){
        const resp = await api.get('register')

        this.setState({
            register: resp.data
        })
    }

    handleRemove(id){
        api.delete(`register/${id}`)
           .then(res => {
               console.log(res)
               console.log(res.data)
           })
    }

    handleSubmit = e => {
        // e.preventDefault()    
        
        const user = {
            name: this.state.name,
            email: this.state.email
        }

        // console.log(user)
        api.post('/register', user)
           .then(res => {
                console.log(res)
            })
           .catch(err => {
                console.log(err.message)
            })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div id="container">
                <div className="header">
                    <Header />          
                </div>
                <div className="conteudo-header">
                    <form>
                        <input type="text" name="search" placeholder="Pesquisa" className="inputSearch"/> 
                        <button type="button" data-toggle="modal" data-target="#modalSubmit"> <i className="fa fa-plus"></i>ADD</button>
                    </form>
                </div>  


                <div className="modal fade" id="modalSubmit" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Registro Cliente</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form" onSubmit={this.handleSubmit}>
                                <input type="text" name="name" placeholder="Nome" className="input" onChange={this.handleChange} value={this.state.name}/> 
                                <input type="email" name="email" placeholder="email@email.com" className="input" onChange={this.handleChange} value={this.state.email}/> 
                               
                            <button type="submit" className="btnCadastrar">Cadastrar</button> 
                            </form>
                        </div>
                    </div>
                </div>
                </div>

                <div className="table-conteudo">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>   
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.register.map(resg => (
                                <tr key={resg.id}>
                                    <td>{resg.id}</td>
                                    <td>{resg.name}</td>
                                    <td>{resg.email}</td>
                                    <td>
                                        <a href="/" onClick={() => this.handleRemove(resg.id)}><i className="fa fa-trash"></i></a>
                                        <a href="/"><i className="fa fa-edit"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>    
        )
    }
}
export default Conteudo