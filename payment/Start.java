package p1;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.time.ZonedDateTime;  

public class Start {
    public static void main(String[] args) {
        RequestSender rs = new RequestSender("10.10.40.95", 10010);
        AirMethod am = new AirMethod();
        am.addMethodHeader("GetAccountDetails");
        am.addStringMember("originNodeType", "EXT");
        am.addStringMember("originHostName", "innovasas");

        am.addStringMember("originTransactionID", "17536370363410022");
        ZonedDateTime zone = ZonedDateTime.parse("2022-03-10T12:36:00+01:00[Europe/Paris]");
        am.addDateMember("originTimeStamp", zone);
        am.addIntMember("subscriberNumberNAI", 1);
        am.addStringMember("subscriberNumber", "22967191973");
        am.openStructMember("requestedInformationFlags");
        am.addBooleanMember("requestMasterAccountBalanceFlag", 1);
        am.closeStructMember();
        am.addBooleanMember("requestPamInformationFlag", 1);
        am.addMethodFooter();
        try {
           rs.connect();
           if(rs.isOpen()) {
               System.out.println("Success");
               rs.sendRequest(am, 2);
           } else {
               System.out.println("nothing");
           }
        } catch (IOException ex) {
            
            System.out.println("error happened");
        }
    }
}
