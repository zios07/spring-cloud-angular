package ma.fgs.product;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.stream.annotation.EnableBinding;

import ma.fgs.product.domain.Role;
import ma.fgs.product.publisher.MessagePublisher;
import ma.fgs.product.repository.RoleRepository;

@SpringBootApplication
@EnableDiscoveryClient
@EnableBinding(MessagePublisher.class)
@EnableFeignClients
public class ProductServiceApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	public ProductServiceApplication(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(ProductServiceApplication.class);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleRepository.count() == 0) {
			Role role1 = new Role("ADMIN", "Administrator");
			Role role2 = new Role("USER", "User");
			Role role3 = new Role("SELLER", "Seller");
			roleRepository.saveAll(Arrays.asList(role1, role2, role3));
		}
	}
}
