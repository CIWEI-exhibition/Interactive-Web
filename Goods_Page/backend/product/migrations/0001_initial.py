# Generated by Django 3.0.7 on 2020-07-30 09:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Detail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main_detail', models.CharField(max_length=100)),
                ('sub_detail', models.CharField(max_length=500)),
                ('feature', models.CharField(max_length=500)),
                ('feature_image', models.CharField(max_length=300)),
                ('name', models.CharField(max_length=50)),
                ('is_main', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'details',
            },
        ),
        migrations.CreateModel(
            name='MainCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'main_categories',
            },
        ),
        migrations.CreateModel(
            name='MainImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.CharField(max_length=300)),
            ],
            options={
                'db_table': 'main_images',
            },
        ),
        migrations.CreateModel(
            name='SubImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.CharField(max_length=300)),
                ('is_hovered', models.BooleanField(default=False)),
                ('shoe_color', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.ShoeColor')),
            ],
            options={
                'db_table': 'sub_images',
            },
        ),
        migrations.AddField(
            model_name='card',
            name='detail',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.Detail'),
        ),
        migrations.AddField(
            model_name='card',
            name='main_category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.MainCategory'),
        ),
    ]