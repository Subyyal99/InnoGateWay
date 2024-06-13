/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package p1;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.StringTokenizer;
import javax.xml.xpath.XPathExpressionException;

/**
 *
 * @author bodossa
 */
public class AirMethod {

    protected StringBuilder inBuilder = new StringBuilder();

    protected boolean getMethod;

    public AirMethod addMethodHeader(String methodName) {
        inBuilder.append("<?xml version=\"1.0\"?><methodCall><methodName>")
                .append(methodName)
                .append("</methodName><params><param><value><struct>");
        return this;
    }

    public AirMethod addMethodFooter() {
        inBuilder.append("</struct></value></param></params></methodCall>");
        return this;
    }

    public AirMethod openStruct() {
        inBuilder.append("<struct>");
        return this;
    }

    public AirMethod closeStruct() {
        inBuilder.append("</struct>");
        return this;
    }

    public AirMethod openStructMember(String name) {
        inBuilder.append("<member><name>")
                .append(name)
                .append("</name><value><struct>");
        return this;
    }

    public AirMethod closeStructMember() {
        inBuilder.append("</struct></value></member>");
        return this;
    }

    public AirMethod openArray() {
        inBuilder.append("<member><array><data>");
        return this;
    }

    public AirMethod closeArray() {
        inBuilder.append("</data></array></member>");
        return this;
    }

    public AirMethod openArrayMember(String name) {
        inBuilder.append("<member><name>")
                .append(name)
                .append("</name><value><array><data>");
        return this;
    }

    public AirMethod closeArrayMember() {
        inBuilder.append("</data></array></value></member>");
        return this;
    }

    public AirMethod addIntToArray(Integer value) {
        inBuilder.append("<value><i4>")
                .append(value)
                .append("</i4></value>");
        return this;
    }

    public AirMethod addStringToArray(String value) {
        inBuilder.append("<value><string>")
                .append(value)
                .append("</string></value>");
        return this;
    }

    public AirMethod addValueToArray() {
        inBuilder.append("<value>");
        return this;
    }

    public AirMethod closeValueInArray() {
        inBuilder.append("</value>");
        return this;
    }

    public AirMethod addStringMember(String name, String value) {
        inBuilder.append("<member><name>")
                .append(name)
                .append("</name><value><string>")
                .append(value)
                .append("</string></value></member>");
        return this;
    }

    public AirMethod addIntMember(String name, Integer value) {
        inBuilder.append("<member><name>")
                .append(name)
                .append("</name><value><i4>")
                .append(value)
                .append("</i4></value></member>");
        return this;
    }

    public AirMethod addBooleanMember(String name, Integer value) {
        inBuilder.append("<member><name>")
                .append(name)
                .append("</name><value><boolean>")
                .append(value)
                .append("</boolean></value></member>");
        return this;
    }

    public AirMethod addDateMember(String name, ZonedDateTime value) {
        inBuilder.append("<member><name>")
                .append(name)
                .append("</name><value><dateTime.iso8601>")
                .append(value.toOffsetDateTime().toString())
                .append("</dateTime.iso8601></value></member>");
        return this;
    }

    protected ArrayList<String> getIdsFromInput(String start, String input) {
        String striped = input.substring(start.length() + 1, input.length() - 1);
        StringTokenizer tokenizer = new StringTokenizer(striped, ",");
        ArrayList<String> output = new ArrayList<>();
        while (tokenizer.hasMoreTokens()) {
            output.add(tokenizer.nextToken());
        }
        return output;
    }

    public String getContent() {
        return inBuilder.toString();
    }

    public void setContent(String content) {
        inBuilder = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" + content);
    }

    public boolean isGetMethod() {
        return getMethod;
    }

    public void setGetMethod(boolean getMethod) {
        this.getMethod = getMethod;
    }

    // public abstract DataObject getDataObject(ResponseScraper responseScraper, AirResponse airResponse) throws XPathExpressionException;

    public ResponseInfo getOutputCode(ResponseScraper responseScraper, AirResponse airResponse) throws XPathExpressionException {
        ResponseInfo responseInfo = new ResponseInfo();
        responseScraper.setSource(airResponse);
        if (airResponse.getContent().contains("responseCode")) {
            responseInfo.setFaulty(false);
            String responseCode = responseScraper.evaluate("/methodResponse/params/param/value/struct/member[name='responseCode']/value/i4");
            responseInfo.setResponseCode(Integer.parseInt(responseCode));
        } else {
            responseInfo.setFaulty(true);
            String faultConde = responseScraper.evaluate("/methodResponse/fault/value/struct/member[name='faultCode']/value/i4");
            responseInfo.setFaultCode(Integer.parseInt(faultConde));
        }

        return responseInfo;
    }

}
