package com.mezosproject.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
public class AttachmentListener {

	@RabbitListener(queues = {"${queue.attachment.name}"})
	public void receiveAttachment(@Payload String message) {
		
	}
	
}
