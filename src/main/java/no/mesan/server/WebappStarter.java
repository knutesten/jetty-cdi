package no.mesan.server;

import no.mesan.rest.RestApplication;
import no.mesan.websockets.ContainersEndpoint;

import org.eclipse.jetty.annotations.AnnotationConfiguration;
import org.eclipse.jetty.plus.webapp.EnvConfiguration;
import org.eclipse.jetty.plus.webapp.PlusConfiguration;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.FragmentConfiguration;
import org.eclipse.jetty.webapp.MetaInfConfiguration;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.webapp.WebInfConfiguration;
import org.eclipse.jetty.webapp.WebXmlConfiguration;
import org.eclipse.jetty.websocket.jsr356.server.ServerContainer;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;
import org.jboss.resteasy.cdi.CdiInjectorFactory;
import org.jboss.resteasy.plugins.server.servlet.HttpServletDispatcher;

public class WebappStarter {
    public static void main(final String[] args) throws Exception {
        final WebAppContext context = new WebAppContext();

        context.setConfigurations(
                new Configuration[]{
                        new AnnotationConfiguration(),
                        new WebXmlConfiguration(),
                        new WebInfConfiguration(),
                        new PlusConfiguration(),
                        new MetaInfConfiguration(),
                        new FragmentConfiguration(),
                        new EnvConfiguration()
                });
        context.setAttribute("org.eclipse.jetty.server.webapp.ContainerIncludeJarPattern", ".*/classes/.*");
        context.setContextPath("/");

        // Set up REST
        final ServletHolder servletHolder = new ServletHolder(HttpServletDispatcher.class);
        servletHolder.setInitParameter("javax.ws.rs.Application", RestApplication.class.getName());
        servletHolder.setInitParameter("resteasy.injector.factory", CdiInjectorFactory.class.getName());
        servletHolder.setInitParameter("resteasy.servlet.mapping.prefix", "/rest");
        context.addServlet(servletHolder, "/rest/*");


        // Development setup
        final ServletHolder disableStaticFileLock = new ServletHolder(new DefaultServlet());
        disableStaticFileLock.setInitParameter("useFileMappedBuffer", "false");
        context.addServlet(disableStaticFileLock, "/");
        context.setResourceBase("src/main/webapp/public");

        // Runnable jar setup
//        context.setResourceBase(ClassLoader.getSystemResource("public").toExternalForm());

        final Server server = new Server(8080);
        server.setHandler(context);

        final ServerContainer webSocketContainer = WebSocketServerContainerInitializer.configureContext(context);
        webSocketContainer.addEndpoint(ContainersEndpoint.class);

        server.start();
        server.join();
    }
}
