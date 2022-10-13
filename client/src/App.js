// IMPORT PACKAGES
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

// IMPORTED COMP
import ProductForm from './components/ProductForm';
import Main from './components/Main';
import ViewOne from './components/ViewOne';
import UpdateOne from './components/UpdateOne';

function App() {



  return (
    <div className="App">


      {/* Switch will be used to handle different 
      route calls to API >>> depending on inputs from form */}


      <Switch>
        {/* UPDATE ONE PRODUCT */}
        <Route path="/products/update/:id">
          <UpdateOne />
        </Route>

        {/* VIEW ONE PRODUCT */}
        <Route path="/products/:id">
          <ViewOne />
        </Route>

        {/* All PRODUCTS */}
        <Route path="/products">
          <h1>Product Manager App</h1>
          <hr />
          <hr />
          <ProductForm />
          <hr />
          <hr />
          <Main />
        </Route>

        {/* REDIRECT TO HOME */}
        <Route path="/">
          <Redirect to="/products" />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
