import {BrowserRouter,Switch,Route} from 'react-router-dom';
import React from 'react';
import map from './componentes/Map';
import NewShelter from './componentes/NewShelter';
import Shelter from './componentes/Shelter';

function Routes(){ 
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={map}/>
                <Route path="/shelter/add" component={NewShelter}/>
                <Route path="/shelter/view" component={Shelter}/>
            </Switch>
        </BrowserRouter>

    );
    
}
export default Routes;

