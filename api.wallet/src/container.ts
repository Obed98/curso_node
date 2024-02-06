import express = require('express');
import { createContainer, asClass } from "awilix";
import { TestService } from "./services/test.service";
import { scopePerRequest } from 'awilix-express';



export default(app: express.Application) => { 
    const container = createContainer({
        injectionMode:'CLASSIC'
    });

    container.register({
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};