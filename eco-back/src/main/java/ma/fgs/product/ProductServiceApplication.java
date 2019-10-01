package ma.fgs.product;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.stream.annotation.EnableBinding;

import ma.fgs.product.publisher.MessagePublisher;

@SpringBootApplication
@EnableDiscoveryClient
@EnableBinding(MessagePublisher.class)
public class ProductServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductServiceApplication.class);
	}
}
