# stuff for jasmine
begin
  STDOUT.sync = true
  puts "A"
  require 'jasmine'
  puts "B"
  load 'jasmine/tasks/jasmine.rake'
  puts "C"
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
