/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package p1;

/**
 *
 * @author bodossa
 */
public class ResponseInfo {

    private boolean faulty;

    private Integer responseCode = null;

    private Integer faultCode = null;

    public boolean isFaulty() {
        return faulty;
    }

    public void setFaulty(boolean faulty) {
        this.faulty = faulty;
    }

    public Integer getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(Integer responseCode) {
        this.responseCode = responseCode;
    }

    public Integer getFaultCode() {
        return faultCode;
    }

    public void setFaultCode(Integer faultCode) {
        this.faultCode = faultCode;
    }

}
