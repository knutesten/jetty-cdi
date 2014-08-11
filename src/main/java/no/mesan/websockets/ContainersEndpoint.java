package no.mesan.websockets;

import java.io.IOException;
import java.util.Set;

import javax.websocket.CloseReason;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.eclipse.jetty.util.ConcurrentHashSet;

@ServerEndpoint(value = "/containers")
public class ContainersEndpoint {
    private final static Set<Session> clients = new ConcurrentHashSet<>();
    private static String containers;

    @OnOpen
    public void onOpen(final Session session) throws IOException, EncodeException {
        clients.add(session);
        if (containers == null) {
            session.getBasicRemote().sendText("empty");
        } else {
            session.getBasicRemote().sendText(containers);
        }
    }

    @OnMessage
    public String onMessage(final String message, final Session session) throws IOException {
        containers = message;
        synchronized (clients) {
            for (final Session client : clients) {
                client.getBasicRemote().sendText(containers);
            }
        }
        return message;
    }

    @OnClose
    public void onClose(final Session session, final CloseReason closeReason) {
        clients.remove(session);
    }
}
