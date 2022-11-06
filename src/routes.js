const Router = require('express');



//middleware
const  middlewareLoginEmpresa = require("./middleware/loginEmpresa")

//validation
const ValidationLogin = require("./validation/login")
const ValidationEmpresa = require("./validation/empresa")
const ValidationCaminhoneiro = require("./validation/caminhoneiro")

//controllers
const EmpresasController = require( "./controllers/EmpresasController");
const ContatoEmpresasController = require( "./controllers/ContatoEmpresasController");
const CarroceriaController = require( "./controllers/CarroceriaController");
const VeiculoController  = require( "./controllers/VeiculoController");
const CaminhoneiroController = require( "./controllers/CaminhoneiroController");
const EspecieController = require( "./controllers/EspecieController");
const FretesController = require( "./controllers/FretesController");
const ProcuraFretesController = require("./controllers/ProcuraFretesController")
const LoginEmpresa = require("./controllers/LoginEmpresaController")
const LoginCaminhoneiro = require("./controllers/LoginCaminhoneiroController")


// import all controllers
// import SessionController from './app/controllers/SessionController';


const routes = new Router.Router();

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

// ROTAS EMPRESAS

routes.post("/empresas", ValidationEmpresa.validatiorEmpresa, EmpresasController.createEmpresas);
routes.get("/empresas", EmpresasController.findAllEmpresas);
routes.get("/empresas/:cnpj", EmpresasController.findEmpresa);
routes.put("/empresas/:cnpj", middlewareLoginEmpresa.LoginEmpresa, EmpresasController.updateEmpresa);
routes.delete("/empresas/:cnpj", middlewareLoginEmpresa.LoginEmpresa, EmpresasController.deleteEmpresa);


// ROTAS CONTATO EMPRESAS

routes.get("/empresas/contato/:cnpj", ContatoEmpresasController.findContatoEmpresa);
routes.put("/empresas/contato/:cnpj", middlewareLoginEmpresa.LoginEmpresa, ContatoEmpresasController.updateContatoEmpresa);


// ROTAS CARROCERIA

//routes.post("/carrocerias", CarroceriaController.createCarroceria);
routes.get("/carrocerias", CarroceriaController.findAllCarroceria);
routes.get("/carrocerias/:carroceria", CarroceriaController.findCarroceria);
/*routes.put("/carrocerias/:carroceria", CarroceriaController.updateCarroceria);
routes.delete("/carrocerias/:carroceria", CarroceriaController.deleteCarroceria);*/

// ROTAS VEICULOS

//routes.post("/veiculos", VeiculoController.createVeiculo);
routes.get("/veiculos", VeiculoController.findAllVeiculo);
routes.get("/veiculos/:veiculo", VeiculoController.findVeiculo);
//URL http://localhost:3030/veiculos/Carreta - O parametro que é passado é o VEICULO!
//routes.put("/veiculos/:veiculo", VeiculoController.updateVeiculo);
routes.delete("/veiculos/:veiculo", VeiculoController.deleteVeiculo);

// ROTAS Caminhneiro

routes.post("/caminhoneiros",ValidationCaminhoneiro.validationCaminhoneiro, CaminhoneiroController.createCaminhoneiro);
routes.get("/caminhoneiros", CaminhoneiroController.findAllCaminhoneiro);
routes.get("/caminhoneiros/:cpf", CaminhoneiroController.findCaminhoneiro);
routes.put("/caminhoneiros/:cpf", CaminhoneiroController.updateCaminhoneiro);
routes.delete("/caminhoneiros/:cpf", CaminhoneiroController.deleteCaminhoneiro);


// ROTAS ESPECIE

//routes.post("/especies", EspecieController.createEspecie);
routes.get("/especies", EspecieController.findAllEspecie);
routes.get("/especies/:especie", EspecieController.findEspecie);
/*routes.put("/especies/:especie", EspecieController.updateEspecie);
routes.delete("/especies/:especie", EspecieController.deleteEspecie);*/


// ROTAS FRETE

routes.post("/fretes",  FretesController.createFrete);
routes.get("/fretes", FretesController.findAllFrete);
routes.get("/fretes/:id", FretesController.findFrete);
routes.put("/fretes/:id", middlewareLoginEmpresa.LoginEmpresa, FretesController.updateFrete);
routes.delete("/fretes/:id", middlewareLoginEmpresa.LoginEmpresa, FretesController.deleteFrete);
 

// ROTAS PROCURA FRETES

routes.post("/procura_fretes", ProcuraFretesController.createProcuraFrete);
routes.get("/procura_fretes", ProcuraFretesController.findAllProcuraFretes);
routes.get("/procura_fretes/:id", ProcuraFretesController.findProcuraFretes);
routes.put("/procura_fretes/:id", ProcuraFretesController.updateProcuraFrete);
routes.delete("/procura_fretes/:id", ProcuraFretesController.deleteProcuraFrete);


// ROTAS LOGIN EMPRESA
routes.post("/login/empresa", ValidationLogin.validationLogin, LoginEmpresa.LoginEmpresa);

routes.post("/login/caminhoneiro", ValidationLogin.validationLogin, LoginCaminhoneiro.LoginCaminhoneiro);

module.exports = routes; 