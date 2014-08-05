package no.mesan.rest;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/helloworld")
public class HelloWorldService {
    @Inject
    private HelloWorld helloWorld;

    @GET
    public String helloWorld() {
        return helloWorld.say();
    }
}
