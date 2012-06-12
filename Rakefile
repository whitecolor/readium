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

scripts_dir = "scripts"
exclude_scripts = []
interm_dir = "build_interm"


namespace :build do

	

	desc "Concat, minify and copy all scripts into publish dir"
	task :copy_scripts do
		jsfiles = File.join(scripts_dir, "**", "*.js")
		script_list = Dir.glob(jsfiles)
	end

	desc "Create working dirs for the build process"
	task :create_workspace => "clean:total" do
		puts "creating the working dir"
		puts `mkdir #{interm_dir}`
	end

	namespace :clean do

		desc "clean up the results of the last build"
		task :total do
			puts "removing the working dir if it exists"
			`rm -rf #{interm_dir}`
		end

		desc "clean up the results of the last build"
		task :clean do
			puts "removing the working dir"
			`rm -rf #{interm_dir}`
		end

		task :default => :total

	end

	desc "The default clean task"
	task :clean => "clean:total"


end

#define the default build process
task :build => ["build:create_workspace"]