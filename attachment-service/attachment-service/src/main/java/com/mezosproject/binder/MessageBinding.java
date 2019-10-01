package com.mezosproject.binder;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface MessageBinding {

	@Input("AttachmentBinding")
	SubscribableChannel receiveAttachment();

}
