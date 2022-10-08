const Router = require('express');

const EmpresasController = require( "./controllers/EmpresasController");
const ContatoEmpresasController = require( "./controllers/ContatoEmpresasController");
const CarroceriaController = require( "./controllers/CarroceriaController");
const VeiculoController  = require( "./controllers/VeiculoController");
const CaminhoneiroController = require( "./controllers/CaminhoneiroController");
const EspecieController = require( "./controllers/EspecieController");
const FretesController = require( "./controllers/FretesController");
const ProcuraFretesController = require("./controllers/ProcuraFretesController")

// import all controllers
// import SessionController from './app/controllers/SessionController';


const routes = new Router.Router();

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

// ROTAS EMPRESAS

routes.post("/empresas", EmpresasController.createEmpresas);
routes.get("/empresas", EmpresasController.findAllEmpresas);
routes.get("/empresas/:cnpj", EmpresasController.findEmpresa);
routes.put("/empresas/:cnpj", EmpresasController.updateEmpresa);
routes.delete("/empresas/:cnpj", EmpresasController.deleteEmpresa);


// ROTAS CONTATO EMPRESAS

routes.get("/empresas/contato/:cnpj", ContatoEmpresasController.findContatoEmpresa);
routes.put("/empresas/contato/:cnpj", ContatoEmpresasController.updateContatoEmpresa);


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
//routes.put("/veiculos/:veiculo", VeiculoController.updateVeiculo);
routes.delete("/veiculos/:veiculo", VeiculoController.deleteVeiculo);

// ROTAS Caminhneiro

routes.post("/caminhoneiros", CaminhoneiroController.createCaminhoneiro);
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

routes.post("/fretes", FretesController.createFrete);
routes.get("/fretes", FretesController.findAllFrete);
routes.get("/fretes/:id", FretesController.findFrete);
routes.put("/fretes/:id", FretesController.updateFrete);
routes.delete("/fretes/:id", FretesController.deleteFrete);


// ROTAS PROCURA FRETES

routes.post("/procura_fretes", ProcuraFretesController.createProcuraFrete);
routes.get("/procura_fretes", ProcuraFretesController.findAllProcuraFretes);
routes.get("/procura_fretes/:id", ProcuraFretesController.findProcuraFretes);
routes.put("/procura_fretes/:id", ProcuraFretesController.updateProcuraFrete);
routes.delete("/procura_fretes/:id", ProcuraFretesController.deleteProcuraFrete);


module.exports = routes;
