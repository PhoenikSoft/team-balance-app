package com.phoenixoft.teambalanceapp.common.exception;

import lombok.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

@ControllerAdvice
public class CustomGlobalExceptionController extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status,
                                                                  WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", status.value());

        //Get all fields errors
        Map<String, List<String>> errorsByField = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(groupingBy(FieldError::getField, mapping(FieldError::getDefaultMessage, toList())));

        body.put("errors", errorsByField);
        return new ResponseEntity<>(body, headers, status);
    }

    @ExceptionHandler(value = IndexedServiceException.class)
    public ResponseEntity<Object> indexedServiceException(IndexedServiceException ex, WebRequest request) {
        return this.handleExceptionInternal(ex, IndexedResponseBody.of(ex.getElemIndex(), ex.getMessage()), new HttpHeaders(), ex.getHttpStatus(), request);
    }

    @ExceptionHandler(value = ServiceException.class)
    public ResponseEntity<Object> serviceException(ServiceException ex, WebRequest request) {
        return this.handleExceptionInternal(ex, ResponseBody.of(ex.getMessage()), new HttpHeaders(), ex.getHttpStatus(), request);
    }

    @Value(staticConstructor = "of")
    private static class ResponseBody {
        String msg;
    }

    @Value(staticConstructor = "of")
    private static class IndexedResponseBody {
        int elemIndex;
        String msg;
    }
}
