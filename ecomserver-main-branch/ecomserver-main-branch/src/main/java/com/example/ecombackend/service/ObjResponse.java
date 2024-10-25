package com.example.ecombackend.service;

public class ObjResponse<T> {
    private boolean success;
    private String message;
    private T data;  
    private int totalPages; 
    public ObjResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.totalPages = 0; 
    }
    public ObjResponse(boolean success, String message, T data, int totalPages) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.totalPages = totalPages; 
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
    
    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
