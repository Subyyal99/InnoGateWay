package p1;


import java.io.StringReader;
import java.util.ArrayList;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author bodossa
 */
public class ResponseScraper {

    private XPath xpath;
    private Node doc;

    private AirResponse source;

    public ResponseScraper() {
        XPathFactory xpf = XPathFactory.newInstance();
        xpath = xpf.newXPath();
    }

    public void setSource(AirResponse source) throws XPathExpressionException {
        this.source = source;
        doc = (Node) xpath.evaluate("/", new InputSource(new StringReader(source.getContent())), XPathConstants.NODE);
    }
    
    public String evaluate(String query) throws XPathExpressionException{
        Node node = (Node) xpath.evaluate(query, doc, XPathConstants.NODE);

        return node.getTextContent();
    }
    
    public String evaluate(Node node, String query) throws XPathExpressionException{
        Node foundNode = (Node) xpath.evaluate(query, node, XPathConstants.NODE);
        return foundNode.getTextContent();
    }
    
    public ArrayList<String> evaluateList(String query) throws XPathExpressionException {
 
        ArrayList<String> result=new ArrayList<>();
        NodeList list = (NodeList) xpath.evaluate(query, doc, XPathConstants.NODESET);
        for (int i = 0; i < list.getLength(); i++) {
            Node node = list.item(i);
            result.add(node.getTextContent());
        }
        return result;
    }
    
    public ArrayList<Node> evaluateNodeList(String query) throws XPathExpressionException {
 
        ArrayList<Node> result=new ArrayList<>();
        NodeList list = (NodeList) xpath.evaluate(query, doc, XPathConstants.NODESET);
        for (int i = 0; i < list.getLength(); i++) {
            Node node = list.item(i);
            result.add(node);
        }
        return result;
    }
    
    public ArrayList<Node> evaluateNodeList(Node node, String query) throws XPathExpressionException {
 
        ArrayList<Node> result=new ArrayList<>();
        NodeList list = (NodeList) xpath.evaluate(query, node, XPathConstants.NODESET);
        for (int i = 0; i < list.getLength(); i++) {
            Node foundNode = list.item(i);
            result.add(foundNode);
        }
        return result;
    }
    

}
