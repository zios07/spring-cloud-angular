package com.mezosproject.exception;

public class NotFoundException extends Exception {

	private static final long serialVersionUID = -3862452912231954340L;

	private String code;
	
	public NotFoundException(String code, String message) {
		super(message);
		this.code =  code;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
