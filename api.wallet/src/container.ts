import express = require('express');
import { createContainer, asClass } from "awilix";
import { TestService } from "./services/test.service";
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';



export default(app: express.Application) => { 
    const container = createContainer({
        injectionMode:'CLASSIC'
    });

    //repositories
    container.register({
        suscriptionRepository: asClass(SubscriptionMySQLRepository).scoped()
    });
    //services
    container.register({
        testService: asClass(TestService).scoped(),
        subscriptionService: asClass(SubscriptionService).scoped()
    });

    app.use(scopePerRequest(container));
};