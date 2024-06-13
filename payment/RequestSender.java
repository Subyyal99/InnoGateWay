/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package p1;

// import com.jbdossa.airlib.utils.Constants;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.SocketTimeoutException;

/**
 *
 * @author bodossa
 */
public class RequestSender {

    private String airIpAddress;

    private Integer airPort;

    private Socket socket;

    private BufferedWriter socketWriter;

    private BufferedReader socketReader;

    public RequestSender(String airIpAddress, Integer airPort) {
        this.airIpAddress = airIpAddress;
        this.airPort = airPort;
    }

    public void connect() throws IOException {
        socket = new Socket(airIpAddress, airPort);
        System.out.println("Connecting");
        socket.setSoTimeout(5000);
        System.out.println("Connected");

        socketReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        socketWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    }

    public void disconnect() throws IOException {
        if (socketWriter != null) {
            socketWriter.close();
        }
        if (socketReader != null) {
            socketReader.close();
        }
        socket.close();
    }

    public boolean isOpen() {
        return !socket.isClosed();
    }

    public AirResponse sendRequest(AirMethod airMethod, int reconnect) throws IOException {

        AirResponse response = new AirResponse();
        boolean faulty = false;
        String methodContent = airMethod.getContent();
        String line;
        String header = "POST /Air HTTP/1.1\nContent-Length: " + methodContent.length()
                + "\nContent-Type: text/xml\nUser-Agent: UGw Server/4.3/1.0\nHost: " + airIpAddress
                + ":" + airPort + "\nAuthorization: Basic bWluc2F0b25haXI6bWluc2F0\n\n";
        StringBuilder respContent = new StringBuilder();

        try {

            socketWriter.write(header + methodContent);
            socketWriter.flush();

            while ((line = socketReader.readLine()) != null) {
                System.out.println("line: "+line);
                respContent.append(line);
                if (line.contains("<fault>")) {
                    faulty = true;
                }
                if (line.contains("</fault>") || line.contains("</params>")) {
                    respContent.append("</methodResponse>");
                    break;
                }
            }
        } catch (SocketTimeoutException ex) {
            if (reconnect < 5) {
                System.out.println("Disconnecting due to TimeOut");
                disconnect();
                System.out.println("Reconnecting now");
                connect();
                System.out.println("Reconnected");
                reconnect++;
                return sendRequest(airMethod, reconnect);
            }
            throw new IOException();
        }

        String respBody = respContent.toString();
        int bodyStart = respBody.indexOf("<?xml");

        System.out.println("respbody: "+respBody+"\n\n");
        // response.setContent(respBody.substring(bodyStart));
        response.setFaulty(faulty);
        return response;
    }

}
