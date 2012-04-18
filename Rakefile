# stuff for jasmine
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :server do
	`thin -R static.ru start`
end

task :styles  do
	`sass --watch css/sass:css -r ./css/sass/bourbon/lib/bourbon.rb`
end


task :deploy do
	to_keep = [ ".", "..", ".git", ".gitignore", "CNAME", "publish" ]
	Dir.foreach(".") do |x| 
		unless to_keep.include? x
			FileUtils.rm_rf x
		end
	end
end

