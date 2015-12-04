require 'rails_helper'

CATEGORY_IDS = {1 => 'TV'}

describe "Product" do
  describe "#price_score" do
    subject{ product.price_score}
    let(:product){ FactoryGirl.create(:product, history: history)}
    context 'when history is nil' do
      let(:history){nil}
      it "should return 0" do
        expect(subject).to eql 0.0
      end
    end
    
    context 'when last history is not today' do
      let(:history){ '{"2015/1/1":23}' }
      it "should return 0" do
        expect(subject).to eql 0.0
      end
    end

    context 'when last history is today but no change' do
      let(:history){ '{"2015/1/1":23}' }
      it "should return 0" do
        expect(subject).to eql 0.0
      end
    end

    context 'when last history is today and has change' do
      let(:history){ '{"2015-1-1":23, "2015-11-11": 45}' }
      before{ expect(Time).to receive(:now).at_least(:once).and_return(Time.new(2015,11,11, "+11:00"))}
      it "should return change" do
        expect(subject).to eql -3.934959349593496
      end
    end

    context 'when last history is today and have more than 1 change' do
      let(:history){ '{"2015-1-1":23, "2015-1-12":24, "2015-11-11": 11}' }
      before{ expect(Time).to receive(:now).at_least(:once).and_return(Time.new(2015,11,11, "+11:00"))}
      it "should return change" do
        expect(subject).to eql 1.3739837398373984
      end
    end
  end


  describe "self.top10" do
    subject {Product.top10}

    context 'when no product' do
      it 'should return no product' do
        tops = subject
        expect(tops[0][:products].length).to eql 0
      end
    end

    context 'when product with price rise' do
      let(:history){ '{"2015-1-1":23, "2015-11-11": 45}' }
      before do
        expect(Time).to receive(:now).at_least(:once).and_return(Time.new(2015,11,11, "+11:00"))
      end
      it "should return no product" do
        FactoryGirl.create(:product, history: history)
        tops = subject
        expect(tops[0][:products].length).to eql 0
      end
    end

    context 'when product with price down' do
      15.times do |i|
        let("history_#{i}".to_sym){ %Q({"2015-1-1":100, "2015-11-11": #{100-i}}) }
      end
      
      before do
        expect(Time).to receive(:now).at_least(:once).and_return(Time.new(2015,11,11, "+11:00"))
      end
      it "should return 10 product" do
        15.times do |i|
          FactoryGirl.create(:product, history: self.send("history_#{i}".to_sym), url: i.to_s)
        end
        tops = subject
        expect(tops[0][:products].length).to eql 10
        expect(tops[0][:products][9].price_score).to be < tops[0][:products][8].price_score
        expect(tops[0][:products][9].price_score).to be > Product.first.price_score
      end
    end

    context 'when product with price down in different order' do
      15.times do |i|
        let("history_#{i}".to_sym){ %Q({"2015-1-1":100, "2015-11-11": #{10 + i}}) }
      end
      
      before do
        expect(Time).to receive(:now).at_least(:once).and_return(Time.new(2015,11,11, "+11:00"))
      end
      it "should return 10 product" do
        15.times do |i|
          FactoryGirl.create(:product, history: self.send("history_#{i}".to_sym), url: i.to_s)
        end
        tops = subject
        tops[0][:products].map {|p| puts p.price_score}
        expect(tops[0][:products].length).to eql 10
        expect(tops[0][:products][9].price_score).to be < tops[0][:products][8].price_score
        expect(tops[0][:products][9].price_score).to be > Product.first.price_score
      end
    end

  end
end
