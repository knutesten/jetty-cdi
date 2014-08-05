package no.mesan.rest;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;
/**
 * TODO
 *
 * @author Knut Esten Melandsø Nekså
 */
public class RestApplication extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(
                HelloWorldService.class
        ));
    }
}
