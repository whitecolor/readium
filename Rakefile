# load in the config file
require './build/default_config.rb'

# load in custom config file if it exists
if File.exists? './build/custom_config.rb'
	require './build/custom_config.rb'
end

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

	# make sure we don't delete anything we didnt want to
	to_keep = [ ".", "..", ".git", ".gitignore" ]
	to_keep = to_keep + @config[:publish_dir]
	to_keep = to_keep + @config[:web_keeps]

	# delete the local branch
	`git branch -D gh-pages`

	# checkout a fresh copy of the branch
	`git checkout -b gh-pages`

	# delete everything we haven't explicitly set to keep
	Dir.foreach(".") do |x| 
		unless to_keep.include? x
			FileUtils.rm_rf x
		end
	end

	# cp everything from the publish dir up one step
	Dir.foreach(@config[:publish_dir]) do |x| 
		current_path = File.join @config[:publish_dir], x
		FileUtils.cp_r current_path, x unless x == '.' ||  x == '..'
	end

	# delete the publish dir
	FileUtils.rm_rf @config[:publish_dir]

	# commit the state of the directory
	`git add .`
	`git add -u`
	`git commit -m 'deploying'`

	# destroy the remote branch
	#{}`git push origin :gh-pages`

	# push up the new remote branch
	#{}`git push origin gh-pages`

	# checkout the master branch
	#{}`git checkout master`

	puts "The app has been deployed successfully!"

end


load 'build/build.rake'
