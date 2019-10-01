package com.mezosproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.stream.annotation.EnableBinding;

import com.mezosproject.binder.MessageBinding;

@SpringBootApplication
@EnableDiscoveryClient
@EnableBinding(MessageBinding.class)
public class AttachmentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AttachmentServiceApplication.class, args);
	}

}
