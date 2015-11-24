require 'rails_helper'

RSpec.describe Package, type: :model do
  describe 'next-label' do
    subject { described_class.next_label(1, client.id) }
    let(:user) { User.create!(email: 'a@b.com', password: '12345678')}
    let(:client) {Client.create!(name: 'hello', user:user)}
    before do
      Package.create(user_id: 1, client: client, number: 5)
      Package.create(user_id: 1, client: client, number: 6)
    end
    it 'return the next label' do
      expect(subject).to eql 'hello-0007'
    end
  end
end
