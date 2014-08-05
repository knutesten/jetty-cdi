package no.mesan.server;

import java.net.URL;
import java.security.ProtectionDomain;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class WarStarter {
    public static void main(final String[] args) throws Exception {
        final Server server = new Server(8080);

        final WebAppContext webapp = new WebAppContext();
        webapp.setContextPath("/");
        final ProtectionDomain protectionDomain = WarStarter.class.getProtectionDomain();
        final URL location = protectionDomain.getCodeSource().getLocation();
        webapp.setWar(location.toExternalForm());
//        webapp.setWar("C:/workspace/jetty-cdi/target/jetty-cdi-1.0-SNAPSHOT.war");
        webapp.setParentLoaderPriority(true);
        server.setHandler(webapp);

        server.start();
        server.join();
    }
}
