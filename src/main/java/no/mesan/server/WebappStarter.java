package no.mesan.server;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class WebappStarter {
    public static void main(final String[] args) throws Exception {
        final Server server = new Server(8080);

        final WebAppContext context = new WebAppContext();
        context.setDescriptor("./src/main/webapp/WEB-INF/web.xml");
        context.setResourceBase("./src/main/webapp");
        context.setContextPath("/");
        context.setParentLoaderPriority(true);
        server.setHandler(context);

        server.start();
        server.join();
    }
}
