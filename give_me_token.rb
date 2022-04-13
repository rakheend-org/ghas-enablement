require 'openssl'
require 'jwt'

private_pem = File.read("/Path/To/Pemfile.pem")
private_key = OpenSSL::PKey::RSA.new(private_pem)

payload = {
    iat: Time.now.to_i - 60,
    exp: Time.now.to_i + (10 * 60),
    iss: "190238"
}

jwt = JWT.encode(payload, private_key, "RS256")

puts jwt
